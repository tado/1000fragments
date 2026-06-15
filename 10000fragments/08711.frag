uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 33.85 - t * 2.44 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 34.59 - t * 2.44 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.02, length(p) * 3.24 - time * 0.78); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.56; p = rot2(2.49) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.11, 1.42, 1.08) + vec3(0.01, 0.15, 0.03);
	col = fract(col * 1.98);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
