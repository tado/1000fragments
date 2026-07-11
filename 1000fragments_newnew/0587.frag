uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.45 + jf * 4.0), cos(t * 0.45 * jf)) * 0.46;
        xs += sin(length(p - im) * 116.98 - t * 13.62 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.51) * -0.69;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.91 / 3.1415927, 1.34 / r + (time * 0.51) * 0.54);
	float d = field(tv, (time * 0.51), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.13, 0.17), vec3(0.52, 0.63, 0.57), cc);
	col *= clamp(r * 1.20, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.985, 1.003, 1.005) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
