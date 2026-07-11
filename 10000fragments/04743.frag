uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 13.46 - t * 6.50 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 28.95 - t * 6.50 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.57;
	{ float fr = length(p); p *= 1.0 + -0.29 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.51; p = rot2(2.08) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.09, 1.02, 0.99) + vec3(0.24, 0.20, 0.10);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
