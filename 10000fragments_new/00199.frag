uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.45, 0.0)) * 32.83 - t * 3.31 + ph);
    float mb = sin(length(p + vec2(0.45, 0.0)) * 24.94 - t * 5.22 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.02;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.25; p = rot2(0.58) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.20, 0.18, 0.50), vec3(0.96, 0.95, 0.70), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
