uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 37.02 - t * 1.48 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 10.82 - t * 1.48 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	p = abs(p) - 0.48;
	p = rot2(p.y * -2.08 + time * 0.47) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.22, vec3(0.56, 0.54, 0.48), vec3(0.45, 0.34, 0.43), vec3(0.83, 1.30, 1.40), vec3(0.87, 0.81, 0.62));
	col = clamp((col - 0.5) * 1.95 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
