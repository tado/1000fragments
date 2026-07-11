uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 27.24 - t * 6.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(0.59) * p;
	p += vec2(-0.84, 0.97) * sin(length(p) * 3.47 - time * 1.07) * 0.16;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.29, vec3(0.52, 0.56, 0.50), vec3(0.40, 0.49, 0.41), vec3(0.92, 1.20, 1.10), vec3(0.79, 0.40, 0.85));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
