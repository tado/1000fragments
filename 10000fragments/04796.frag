uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.66 + t * 1.32 + ph) + sin(p.y * 15.15 - t * 3.23 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.91;
	p = rot2(p.y * 3.06 + time * 0.80) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.45; p = rot2(1.68) * p; }
	p = abs(p) - 0.55;
	p = fract(p * 2.08) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.80 + time * 0.07);
	col = fract(col * 2.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
