uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.02 + t * 1.37) - 0.5) * 2.0;
    v = sin((p.y * 3.96 + zx * 1.73 + t * 2.57) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.68;
	p *= 1.0 + 0.38 * sin((time * 0.62) * 4.21);
	p = rot2(p.y * 3.75 + (time * 0.62) * 0.30) * p;
	float d = field(p, (time * 0.62), 0.0);
	vec3 col = palette(d * 1.33 + (time * 0.62) * 0.08, vec3(0.34, 0.36, 0.32), vec3(0.08, 0.08, 0.09), vec3(0.70, 0.46, 0.47), vec3(0.92, 0.21, 0.75));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.31));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(0.927, 0.995, 1.025) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
