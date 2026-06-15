uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.87, t * 0.36 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.36;
	{ float fr = length(p); p *= 1.0 + -0.53 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.25; p = rot2(2.38) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.25, length(p) * 3.78 - time * 0.62); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.81 + time * 0.14);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
