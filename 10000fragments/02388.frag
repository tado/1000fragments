uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.54 + sr * 12.77 - t * 0.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.84;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.32, 1.21, 1.28) + vec3(0.15, 0.10, 0.29);
	col = mod(col * 3.00, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
