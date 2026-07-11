uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 27.74 - t * 5.92 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 35.19 - t * 7.85 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.14; p = rot2(1.03) * p; }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.94;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.05, 0.09, 0.52), vec3(0.93, 0.75, 0.87), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
