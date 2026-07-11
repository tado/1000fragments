uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.60 + t * 3.51 + ph) * 0.7;
    float wb = sin(p.y * 17.47 - t * 3.07 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.73;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	p = rot2(1.69) * p;
	p = abs(p) - 0.23;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.50; p = rot2(2.13) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.22), field(p, time, 0.43));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
