uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.28 + jf * 4.0), cos(t * 0.16 * jf)) * 0.49;
        xs += sin(length(p - im) * 122.32 - t * 9.80 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.84 + time * 0.29);
	col *= 0.84 + 0.14 * sin(gl_FragCoord.y * 2.61 + time * 5.96);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
