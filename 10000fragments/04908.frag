uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.36 + jf * 4.0), cos(t * 0.26 * jf)) * 0.74;
        xs += sin(length(p - im) * 110.54 - t * 4.55 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.70;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.17, 0.45, 0.36), vec3(0.91, 0.61, 0.65), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
