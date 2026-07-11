uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.54 + t * 2.96 + ph) + sin(p.y * 2.62 - t * 1.08 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.x += sin(p.y * 5.70 + time * 3.57) * 0.13;
	p = rot2(0.95) * p;
	p *= 1.49;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.99 + time * 0.02, vec3(0.52, 0.56, 0.45), vec3(0.49, 0.41, 0.43), vec3(1.01, 0.82, 0.87), vec3(0.85, 0.25, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
