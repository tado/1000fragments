uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.23 + vec2(t * 2.94, -t * 2.69) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.22; p = rot2(2.52) * p; }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.51));
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.25 + time * 0.21);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.73 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
