uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.52 + jf * 4.0), cos(t * 0.13 * jf)) * 0.81;
        xs += sin(length(p - im) * 172.37 - t * 13.27 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.18;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.53 / 3.1415927, 0.45 / r + time * 2.73);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.39, vec3(0.59, 0.55, 0.46), vec3(0.32, 0.44, 0.44), vec3(1.30, 1.25, 0.92), vec3(1.00, 0.52, 0.50));
	col *= clamp(r * 1.43, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
