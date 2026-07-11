uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.99 + sr * 9.56 - t * 3.09 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.87;
	p = (floor(p * 11.0) + 0.5) / 11.0;
	p += vec2(0.54, 0.79) * sin(length(p) * 4.20 - time * 2.15) * 0.20;
	{ p = vec2(atan(p.y, p.x) * 2.19, length(p) * 4.33 - time * 0.96); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.25, 0.04, 0.41), vec3(0.99, 0.97, 0.96), d);
	col = mod(col * 1.36, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
