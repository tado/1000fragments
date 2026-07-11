uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 11.47 - t * 6.43 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 14.49 - t * 5.49 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.81;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.72, lr * 1.46 + time * 0.41); }
	p *= 2.45;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.32; p = rot2(2.31) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.48, 0.21, 0.43), vec3(0.65, 0.87, 0.68), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
