uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.63 + jf * 4.0), cos(t * 0.51 * jf)) * 0.43;
        xs += sin(length(p - im) * 117.81 - t * 13.29 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.61), cos(time * 1.22)) * 0.08;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.03 / 3.1415927, 0.67 / r - time * 1.64);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.47 + time * 0.27, vec3(0.42, 0.44, 0.43), vec3(0.33, 0.48, 0.41), vec3(1.09, 1.38, 0.85), vec3(0.21, 0.62, 0.47));
	col *= clamp(r * 2.19, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
