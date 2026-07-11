uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 32.04 - t * 5.79 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 39.29 - t * 5.79 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.73;
	p = rot2(p.y * 1.31 + time * 0.55) * p;
	p = rot2(length(p) * 1.71 + time * 0.37) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.93, 1.58, 0.90) + vec3(0.17, 0.14, 0.20);
	col = mod(col * 1.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
