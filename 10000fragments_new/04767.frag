uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.65 + sr * 9.06 - t * 4.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.00;
	{ p = vec2(atan(p.y, p.x) * 2.69, length(p) * 2.64 - time * 0.38); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.31, 0.25, 0.36), vec3(0.64, 0.67, 0.57), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
