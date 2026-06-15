uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.19 + jf * 4.0), cos(t * 0.57 * jf)) * 0.57;
        xs += sin(length(p - im) * 97.64 - t * 7.72 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.94 + time * 0.09, vec3(0.48, 0.49, 0.46), vec3(0.43, 0.32, 0.44), vec3(1.12, 1.02, 0.85), vec3(0.94, 0.11, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
