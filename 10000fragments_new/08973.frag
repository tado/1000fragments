uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 34.02 - t * 1.54 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 17.14 - t * 1.35 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.46; p = rot2(1.66) * p; }
	p = rot2(length(p) * -2.92 + time * 0.64) * p;
	{ float fr = length(p); p *= 1.0 + 0.22 * fr * fr; }
	p = abs(p) - 0.53;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.49, 0.05, 0.55), vec3(0.56, 0.92, 0.75), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
