uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.99 + t * 4.64 + ph) + sin(p.y * 6.46 - t * 2.68 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.17, -0.29) * sin(length(p) * 2.66 - time * 0.85) * 0.11;
	p *= 2.72;
	p = rot2(time * -0.48) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.10, vec3(0.53, 0.56, 0.53), vec3(0.45, 0.34, 0.39), vec3(1.11, 0.85, 1.30), vec3(0.87, 0.62, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
