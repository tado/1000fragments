uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.65 + jf * 4.0), cos(t * 0.31 * jf)) * 0.47;
        xs += sin(length(p - im) * 218.75 - t * 6.42 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.12), cos(time * 1.14)) * 0.26;
	float an = atan(p.y, p.x) + time * -0.60;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.97 / 3.1415927, 0.34 / r - time * 1.59);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.52 + time * 0.26, vec3(0.49, 0.44, 0.52), vec3(0.40, 0.35, 0.32), vec3(0.95, 1.39, 1.02), vec3(0.41, 0.44, 0.36));
	col *= clamp(r * 1.99, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
