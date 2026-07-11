uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.80 + sr * 4.57 - t * 1.88 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.54;
	{ p = vec2(atan(p.y, p.x) * 1.27, length(p) * 4.76 - time * 0.64); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.45, 0.21, 0.54), vec3(0.98, 1.00, 0.46), d);
	col = fract(col * 1.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
