uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.86 + sr * 7.69 - t * 2.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.35;
	p = abs(p);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.31, 0.45, 0.48), vec3(0.93, 0.57, 0.49), d);
	col = mod(col * 1.97, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
