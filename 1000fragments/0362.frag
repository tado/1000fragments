uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.92 + jf * 4.0), cos(t * 0.10 * jf)) * 0.66;
        xs += sin(length(p - im) * 132.49 - t * 10.73 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.77, -0.88) * sin(length(p) * 5.61 - time * 1.69) * 0.31;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.64 + time * 0.15, vec3(0.59, 0.59, 0.49), vec3(0.44, 0.34, 0.50), vec3(1.13, 1.32, 0.92), vec3(0.20, 0.83, 0.73));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
