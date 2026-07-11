uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 29.07 - t * 7.29 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 28.25 - t * 7.29 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.40) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.22; p = rot2(0.69) * p; }
	p = abs(p) - 0.62;
	p *= 2.61;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.61), field(p, time, 1.22));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.10 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
