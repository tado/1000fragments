uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.94 - t * 2.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.45;
	p = rot2(time * 0.73) * p;
	p = rot2(1.04) * p;
	p += vec2(0.29, 0.29) * sin(length(p) * 3.63 - time * 1.19) * 0.13;
	p = rot2(length(p) * -3.04 + time * 0.95) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.38, 0.40, 0.10), vec3(0.80, 0.56, 0.61), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
