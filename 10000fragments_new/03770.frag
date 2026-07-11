uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.49 + sr * 13.32 - t * 1.06 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + -0.26 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.42, length(p) * 5.77 - time * 0.40); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.13, vec3(0.44, 0.57, 0.58), vec3(0.46, 0.33, 0.37), vec3(1.15, 1.32, 1.30), vec3(0.96, 0.70, 0.37));
	col = mod(col * 2.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
