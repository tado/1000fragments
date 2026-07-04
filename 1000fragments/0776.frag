uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.16 + jf * 4.0), cos(t * 0.51 * jf)) * 0.94;
        xs += sin(length(p - im) * 74.73 - t * 10.59 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.17 / 3.1415927, 0.99 / r + time * 1.87);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.05, 0.27), vec3(0.61, 0.82, 0.88), cc);
	col *= clamp(r * 1.81, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
