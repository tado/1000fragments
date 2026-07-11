uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 28.10 - t * 7.79 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 24.41 - t * 7.79 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.70;
	p = rot2(time * -1.00) * p;
	p = rot2(1.43) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.98 + time * 0.21, vec3(0.45, 0.52, 0.56), vec3(0.37, 0.49, 0.41), vec3(1.11, 1.39, 0.85), vec3(0.24, 0.12, 0.30));
	col = clamp((col - 0.5) * 1.78 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
