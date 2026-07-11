uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.47 + t * 3.09 + ph) * 0.7;
    float wb = sin(p.y * 17.44 - t * 3.49 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.21;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 2.53 + time * 0.95) * p;
	p = (floor(p * 16.0) + 0.5) / 16.0;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.17, vec3(0.45, 0.54, 0.41), vec3(0.49, 0.43, 0.31), vec3(1.19, 1.31, 0.90), vec3(0.85, 0.39, 0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
