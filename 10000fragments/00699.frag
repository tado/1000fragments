uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.98 + sin(p.y * 2.69 + t * 4.93) * 3.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 1.50, length(p) * 2.21 - time * 0.63); }
	p = rot2(p.y * 1.27 + time * 0.75) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.22; p = rot2(2.23) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.56 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
