uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.84 + sin(p.y * 3.18 + t * 3.88) * 2.67 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.47; p = rot2(0.63) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.06, 0.28, 0.09), vec3(0.93, 0.81, 0.55), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
