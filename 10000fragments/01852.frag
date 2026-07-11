uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.98 + sr * 18.69 - t * 0.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.56, 0.76) * sin(length(p) * 5.67 - time * 1.87) * 0.26;
	p = fract(p * 1.43) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.29), field(p, time, 0.57));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
