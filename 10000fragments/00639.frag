uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 34.36 - t * 6.64 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 26.79 - t * 6.64 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.39; p = rot2(1.77) * p; }
	p = rot2(p.y * 1.20 + time * 0.12) * p;
	p *= 1.74;
	{ p = vec2(atan(p.y, p.x) * 1.74, length(p) * 4.29 - time * 0.60); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.08, 0.77, 0.87) + vec3(0.07, 0.11, 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
