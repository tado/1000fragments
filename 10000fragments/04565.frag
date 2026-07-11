uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 16.37 - t * 5.88 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 16.75 - t * 5.88 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.87;
	p = rot2(p.y * 3.44 + time * 0.32) * p;
	p = abs(p);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.36; p = rot2(0.61) * p; }
	p = rot2(time * 1.02) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.20, 0.32, 0.17), vec3(0.54, 0.77, 0.49), d);
	col = clamp((col - 0.5) * 1.98 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
