uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.23 + jf * 4.0), cos(t * 0.19 * jf)) * 0.89;
        xs += sin(length(p - im) * 150.53 - t * 5.15 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.31;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.06 / 3.1415927, 0.65 / r - time * 1.55);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.47 + time * 0.68);
	col *= clamp(r * 2.57, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
