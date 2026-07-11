uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.52 + jf * 4.0), cos(t * 0.11 * jf)) * 0.33;
        xs += sin(length(p - im) * 188.20 - t * 13.50 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.56), cos(time * 0.70)) * 0.26;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.99 / 3.1415927, 0.93 / r + time * 0.87);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.10, 0.02), vec3(0.68, 0.59, 0.66), cc);
	col *= clamp(r * 2.99, 0.0, 1.0);
	col = mod(col * 2.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
