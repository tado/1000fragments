uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.69 + sr * 4.96 - t * 2.20 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.00, 0.28, 0.31), vec3(0.52, 0.96, 0.83), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
