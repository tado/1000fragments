uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.65 + t * 4.20 + ph) + sin(p.y * 4.27 - t * 5.89 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -3.74 + time * 0.45) * p;
	p.y += sin(p.x * 2.90 + time * 1.09) * 0.14;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.83 + time * 0.12, vec3(0.44, 0.42, 0.44), vec3(0.49, 0.42, 0.45), vec3(0.92, 0.99, 1.39), vec3(0.13, 0.28, 0.56));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
