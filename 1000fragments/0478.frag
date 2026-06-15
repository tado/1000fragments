uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.68 + t * 4.52 + ph) + sin(p.y * 12.44 - t * 2.57 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -1.36) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.60 + time * 0.28, vec3(0.60, 0.44, 0.59), vec3(0.33, 0.41, 0.41), vec3(1.30, 1.07, 0.89), vec3(0.49, 0.93, 0.60));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
