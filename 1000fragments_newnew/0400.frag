uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.65 + vec2(t * 0.99, -t * 0.94);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	float d = field(p, (time * 0.58), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.66, 0.69, 0.70) + vec3(0.11, 0.10, 0.11);
	col *= 0.81 + 0.18 * sin(gl_FragCoord.y * 2.53 + (time * 0.58) * 6.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(1.004, 0.993, 1.019) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
