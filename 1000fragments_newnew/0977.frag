uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.17 + jf * 4.0), cos(t * 0.39 * jf)) * 0.34;
        xs += sin(length(p - im) * 105.74 - t * 6.43 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.69) * 1.48), cos((time * 0.69) * 1.19)) * 0.11;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.54 / 3.1415927, 0.43 / r + (time * 0.69) * 1.23);
	float d = field(tv, (time * 0.69), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.21, 0.32), vec3(0.47, 0.64, 0.63), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 1.16, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.02));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(1.007, 0.958, 1.008) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
