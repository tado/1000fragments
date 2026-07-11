uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.46 + sr * 10.94 - t * 2.36 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.52;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.37, 0.13, 0.59), vec3(0.88, 0.54, 0.78), d);
	col = fract(col * 1.65);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
