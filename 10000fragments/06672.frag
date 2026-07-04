uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.76 + jf * 4.0), cos(t * 0.53 * jf)) * 0.65;
        xs += sin(length(p - im) * 71.46 - t * 7.60 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.07 / 3.1415927, 1.27 / r + time * 1.37);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.77, 0.48, 0.59) * (0.05 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 1.42, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
