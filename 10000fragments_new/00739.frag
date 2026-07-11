uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.41 + sr * 20.40 - t * 1.81 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.27, 0.30, 0.37), vec3(0.74, 0.99, 0.84), d);
	col = mod(col * 2.08, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
