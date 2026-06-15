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
        vec2 im = vec2(sin(t * 0.56 + jf * 4.0), cos(t * 0.41 * jf)) * 0.56;
        xs += sin(length(p - im) * 197.92 - t * 5.54 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	p = fract(p * 2.35) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.94 + time * 0.30, vec3(0.49, 0.44, 0.43), vec3(0.49, 0.32, 0.49), vec3(1.04, 1.36, 0.73), vec3(0.83, 0.93, 0.27));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
