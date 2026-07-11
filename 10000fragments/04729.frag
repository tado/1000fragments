uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 11.28 - t * 6.01 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 12.66 - t * 6.01 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.84;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.18, 0.32), vec3(0.84, 0.56, 0.64), d);
	col = mod(col * 1.47, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
