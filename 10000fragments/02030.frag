uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.78 + sr * 21.31 - t * 1.02 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.24;
	p = abs(p) - 0.23;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.72, 0.71, 0.66) + vec3(0.20, 0.15, 0.23);
	col = fract(col * 1.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
