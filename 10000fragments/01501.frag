uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.81 - t * 8.48 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.26;
	{ p = vec2(atan(p.y, p.x) * 1.74, length(p) * 4.78 - time * 0.77); }
	p = rot2(time * -0.36) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.15; p = rot2(1.05) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.59, 1.44, 1.10) + vec3(0.23, 0.25, 0.15);
	col = mod(col * 1.71, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
